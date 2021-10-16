#Unit 14.1 How the web works answers

## part one
- http stands for hypertext transfer protocol and is a standardized way to send data over a server 
- url is uniform resource locator and is the unique address for an internet resource, which is really just a program that talks to the server
- DNS is the domain name system and it converts human readable url into IP addresses (for computer readable)
- a query string is an argument that is sent via a get request in the url and is a key:value pair which starts with *?*
- two http verbs: get = which "gets" data from the server but doesn't normally write or change and post = which sends data to the server to be changed 
- HTTP request is a request from a client to a server for information which follows the HTTP protocol
- an HTTP response is the corisponding repsonse from the server to the client wiht HTML/CSS/JS coming back.
- HTTP header tells the server what content is needed in the example of request header: host, launage, accept, or response: content type, last mondified, set-cookie, cache-control
- when you type “http://somesite.com/some/page.html” it first tells the server the protocol: http, then the hostname (which the DNS converts to IP address / a unique ID / Location) of somesite.com, then askes for the resource some/page.html. That is all in a request which if accepted sends a response.
- Another way to think about it is:
    1. browser "resolves" the name into IP address via dns
    2. browser makes a requests to that IP address with headers and other info
    3. server sends a response typically html and status code 200
    4. browser makes a DOM from that HTML and find an other resources needed (images, CSS, javascript)
    5. browswer makes serpate HTTP request for those resources and recieves reposnes from the server for each!
