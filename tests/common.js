import http from "k6/http";
import { sleep, check } from "k6";
// import {v4 as uuidv4} from "uuid"

const apiBaseUrl = "http://localhost:8000/api";

function generateRandomString() {
  const timestamp = new Date().getTime();
  sleep(0.01);

  return `${timestamp}`;
}

async function getKeyValuePair(key) {
  const response = http.get(`${apiBaseUrl}/data/get/${key}`);

  check(response, {
    "content type JSON": (res) => res.headers["Content-Type"] === "application/json",
  });

  const responseData = response.json();

  return {
    responseStatus: response.status,
    responseData: responseData,
  };
}

async function addRandomKeyValuePair() {
  const randomKey = generateRandomString();
  const randomValue = generateRandomString();

  const requestBody = {
    key: randomKey,
    value: randomValue,
  };
  const requestParams = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.post(`${apiBaseUrl}/data/add`, JSON.stringify(requestBody), requestParams);

  check(response, {
    "content type JSON": (res) => res.headers["Content-Type"] === "application/json",
  });

  const responseData = response.json();

  return {
    requestData: requestBody,
    responseStatus: response.status,
    responseData: responseData,
  };
}

async function updateKeyValuePair(key) {
  const randomValue = "";

  const requestBody = {
    value: randomValue,
  };
  const requestParams = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.put(`${apiBaseUrl}/data/update/${key}`, JSON.stringify(requestBody), requestParams);

  check(response, {
    "content type JSON": (res) => res.headers["Content-Type"] === "application/json",
  });

  const responseData = response.json();

  return {
    requestData: requestBody,
    responseStatus: response.status,
    responseData: responseData,
  };
}

async function deleteKeyValuePair(key) {
  const response = http.delete(`${apiBaseUrl}/data/delete/${key}`, JSON.stringify(requestBody), requestParams);

  check(response, {
    "content type JSON": (res) => res.headers["Content-Type"] === "application/json",
  });

  const responseData = response.json();

  return {
    requestData: requestBody,
    responseStatus: response.status,
    responseData: responseData,
  };
}

export async function testCRUD() {}
