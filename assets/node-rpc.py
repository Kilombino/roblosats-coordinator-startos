#!/usr/bin/env python3
# The Bitcoin node's RPC for the coordinator, on 127.0.0.1:8332: forwards each call to Knots
# (BLAKE2b) Companion's RPC (NODE_RPC_UPSTREAM, its address on StartOS's bridge) with the node's
# current cookie, read again for every call, so a restart of the node (which writes a new cookie)
# needs no restart here. Whatever user and password the caller sends are ignored. Only the
# coordinator (address checks for on-chain payouts) and the panel (block height) use it.
import base64
import os
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

UPSTREAM = os.environ.get("NODE_RPC_UPSTREAM", "")
COOKIE = os.environ.get("NODE_RPC_COOKIE", "/mnt/bitcoind/.cookie")


class Handler(BaseHTTPRequestHandler):
    server_version = "node-rpc"

    def log_message(self, *a):
        pass

    def reply(self, code, body, ctype="application/json"):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        body = self.rfile.read(int(self.headers.get("Content-Length") or 0))
        if not UPSTREAM:
            return self.reply(503, b'{"result":null,"error":{"code":-1,"message":"Knots (BLAKE2b) Companion is not installed"},"id":null}')
        try:
            with open(COOKIE) as f:
                auth = base64.b64encode(f.read().strip().encode()).decode()
        except OSError:
            return self.reply(503, b'{"result":null,"error":{"code":-1,"message":"The node has not written its cookie yet"},"id":null}')
        req = urllib.request.Request("http://%s/" % UPSTREAM, data=body, method="POST", headers={
            "Content-Type": "application/json", "Authorization": "Basic " + auth})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return self.reply(r.status, r.read())
        except urllib.error.HTTPError as e:
            return self.reply(e.code, e.read())
        except Exception as e:
            return self.reply(502, ('{"result":null,"error":{"code":-1,"message":"%s"},"id":null}' % e.__class__.__name__).encode())


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 8332), Handler).serve_forever()
