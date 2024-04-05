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
  const randomValue = generateRandomString();

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
    queryData: {
      key: key,
    },
    requestData: requestBody,
    responseStatus: response.status,
    responseData: responseData,
  };
}

async function deleteKeyValuePair(key) {
  const response = http.del(`${apiBaseUrl}/data/delete/${key}`);

  check(response, {
    "content type JSON": (res) => res.headers["Content-Type"] === "application/json",
  });

  const responseData = response.json();

  return {
    responseStatus: response.status,
    responseData: responseData,
  };
}

async function testAddKeyValuePair() {
  const addRandomResult = await addRandomKeyValuePair();

  check(addRandomResult, {
    "check response status": (result) => result.responseStatus === 200,
  });

  const getResult = await getKeyValuePair(addRandomResult.requestData.key);

  check(getResult, {
    "check response status": (result) => result.responseStatus === 200,
    "check key": (result) => result.responseData.result.key === addRandomResult.requestData.key,
    "check value": (result) => result.responseData.result.value === addRandomResult.requestData.value,
  });
}

async function testUpdateKeyValuePair() {
  const addRandomResult = await addRandomKeyValuePair();

  check(addRandomResult, {
    "check response status": (result) => result.responseStatus === 200,
  });

  const updateResult = await updateKeyValuePair(addRandomResult.requestData.key);

  check(updateResult, {
    "check response status": (result) => result.responseStatus === 200,
  });

  const getResult = await getKeyValuePair(addRandomResult.requestData.key);

  check(getResult, {
    "check response status": (result) => result.responseStatus === 200,
    "check get key": (result) => result.responseData.result.key === addRandomResult.requestData.key,
    "check get value": (result) => result.responseData.result.value === updateResult.requestData.value,
  });
}

async function testDeleteKeyValuePair() {
  const addRandomResult = await addRandomKeyValuePair();

  check(addRandomResult, {
    "check response status": (result) => result.responseStatus === 200,
  });

  sleep(0.01);

  const deleteResult = await deleteKeyValuePair(addRandomResult.requestData.key);

  check(deleteResult, {
    "check response status": (result) => result.responseStatus === 200,
  });

  const getResult = await getKeyValuePair(addRandomResult.requestData.key);

  check(getResult, {
    "check response status": (result) => result.responseStatus === 404,
  });
}

export async function testCRUD() {
  await testAddKeyValuePair();

  await testUpdateKeyValuePair();

  await testDeleteKeyValuePair();
}
