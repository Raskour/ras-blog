---
author: Rasmeet Kour
pubDatetime: 2023-08-14T5:15:24Z
title: Intro to REST API
postSlug: intro-to-rest-api
featured: true
draft: false
tags:
  - rest
  - api
  - http
  - intro
ogImage: "/assets/intro-rest-og.jpg"
description: This article will explain what an API is and why do we need REST APIs for.
---

API (Application Programming Interface) is a set of rules that allows the developer's code to communicate with external applications or service by sending requests or receiving responses without needing to know the internal working of the external system.

It acts as an interface between different applications. They are commonly used to access data, services or features provided by other applications, libraries or platform.

![API integration with client, server, database and cloud](/assets/api.jpg)

A general API is a broader term that can encompass various architectural styles including REST.

---

## Table of contents

---

## REST API

A REST API is a specific type of API that follows the principles of REST architectural style.

REST stands for Representational State Transfer. In simple words it means that each request from a client to a server must contain all the information needed for the server to fulfill the request. The server doesn't retain any client-specific state between requests.

It is commonly used for building webservices that allow different software applications to communicate with each other over internet. It uses HTTP protocol as a communication interface and transfers data through HTTP methods.

![REST API in action](/assets/rest-api.jpg)

---

## Anatomy of REST API

The anatomy of a request in a REST API involves several components that provide information to the server about the action the client wants to perform. A typical REST API request includes:

### REST API Methods

In HTTP there are [5 request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) that are commonly used while implementing a REST API.

- `GET`: Retrieve specified resource from the server
- `POST`: Create new resource on the server
- `PUT`: Update existing resource on the server
- `DELETE`: Remove a resource from the server
- `PATCH`: To make **partial** update on a resource

### URI (Uniform Resource Identifier)

In a REST API, URIs are used to represent resources that the client can interact with but it doesn't necessarily provide the details of how to access it. Following are the two examples of URI:

- `/api/posts/123` is a URI that identifies a specific blog post with `ID 123`.
- `/api/categories` is a URI that represents the collection of _categories_.

### URL (Uniform Resource Locator)

A URL is a specific type of URI that not only identifies a resource but also provides the means to locate it. URLs include the `protocol`, `domain name`, `path`, and sometimes `query parameters`, allowing the client to understand how to access the resource over the internet.

Let's look at the following examples:

- `https://example.com/api/posts/123` is a URL that identifies and provides the means to access the blog post with `ID 123` using the `HTTPS protocol` and the domain name `example.com`.
- `https://example.com/api/categories` is a URL that points to the collection of _categories_ on the same domain.

### Headers

Headers are additional pieces of information included in the HTTP request and response messages exchanged between the client (usually an application or browser) and the server.

There are [several types of headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers), each serving a specific purpose. Here are some common headers used in a REST API.

- `Content-Type`: This header indicates the format of the data in the request or response body. For example, it could be set to `application/json` if the data is in [JSON format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON), or `text/xml` if it's in [XML format](https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction).

```js
  POST /api/users
  Content-Type: application/json
  { "name": "Alice", "email": "alice@example.com" }
```

- `Accept`: This header specifies the preferred format for the response data. It tells the server what content type the client can process. For example, `Accept: application/json` indicates that the client prefers JSON data.

```js
GET / api / posts / 123;
Accept: application / json;
```

### Query Parameters

Query parameters are a way to pass additional information to a server when making a request in a REST API. They are included in the URL after a question mark `(?)` and are used to modify the behavior of the request or filter the results.
Some examples are:

- `Filtering Resources`: Query parameters are commonly used to filter resources based on specific criteria. In this example below, we're requesting a list of products that belong to the _"electronics"_ category.

```js
  GET /api/products?category=electronics
```

- `Searching Resources`: Query parameters can be used to perform searches on the server. Here, we're searching for products that match the keyword _"phone"_

```js
  GET /api/products?search=phone
```

### Request Body

For `POST` and `PUT` requests, the request body contains the data that the client wants to send to the server. The format of the data (e.g., JSON, XML) is specified in the `Content-Type` header.

Here's a simple example of a REST API request to create a new user:

```js
  POST /api/users
  Host: example.com
  Content-Type: application/json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
```

Let's break the above examples in bullet points to understand this better:

- The HTTP method is POST, indicating the intention to create data.
- The URL is `/api/users`, specifying the endpoint for user resources.
- The `Host` header indicates the server where the request is sent.
- The `Content-Type` header specifies that the request body contains JSON data.
- The request body contains the data (_name_ and _email_) for creating a new user.

---

### Summary

In this article, we looked into the world of APIs, showing how they're like bridges connecting developers' code and external apps. We then zoom in on REST APIs, breaking down how they follow REST principles, letting different software apps communicate smoothly using HTTP methods. By unpacking REST API parts, from methods and URIs to headers and query parameters, the idea was to give you a starting intro on the architecture of REST APIs.

### Resources

- [REST - MDN documentation](https://developer.mozilla.org/en-US/docs/Glossary/REST)
- [What Is A RESTFul API? - An AWS explanation](https://aws.amazon.com/what-is/restful-api/)
