#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask
from flask import request
import requests
import nmap
import whois
import ssl
import socket
from urllib.parse import urlparse
app = Flask(__name__)

@app.route('/webscan')
def web_scanner():
    url = request.args.get('url')
    r = requests.get(url)
    return json.dumps(dict(r.headers), indent=4, sort_keys=True)

@app.route('/web-whois')
def web_whois():
    url = request.args.get('url')
    w = whois.whois(url)
    return json.dumps(dict(w), indent=4, sort_keys=True, default=str)

@app.route('/port-scanner')
def port_scanner():
    url = request.args.get('ip')
    nm = nmap.PortScanner()
    res = nm.scan(url, '22-443')
    return json.dumps({'res': dict(res)})


@app.route('/cert-info')
def cert_info():
    url = urlparse(request.args.get('url'))
    ctx = ssl.create_default_context()
    with socket.create_connection((url.netloc, 443)) as sock:
        with ctx.wrap_socket(sock, server_hostname=url.netloc) as ssock:
            cert = ssock.getpeercert()
            return json.dumps(cert)
app.run()