'use strict';

const rateUrl = 'http://localhost:3000/rate';
const scheduleUrl = 'http://localhost:3000/schedule';
const filterUrl = 'http://localhost:3000/filter';
const findUrl = 'http://localhost:3000/find';
const payUrl = 'http://localhost:3000/pay'

const login = 'login';
const passwd = 'psw';

const ratesupplier = async (name, grade) => {
  return (await fetch(rateUrl, {
    method: 'PUT',
    body: { login: login, psw: passwd, name: name, grade: grade }
  })).json();
}

const addPrepayment = async (name, evt) => {
  return (await fetch(payUrl, {
    method: 'POST',
    body: { login: login, psw: passwd, name: name, evt: evt }
  })).json();
}

const schedule = async (evts, toDel = true) => {
  return (await fetch(scheduleUrl, {
    method: toDel ? 'DELETE' : 'POST',
    body: {login: login, psw: passwd, evts: evts}
  })).json()
}

const filterEvts = async (props) => {
  return (await fetch(filterUrl, {
    method: 'GET',
    body: {login: login, psw: passwd, props: props}
  })).json()
}

const find = async (prop, value) => {
  return (await fetch(findUrl + '/' + prop, {
    method: 'GET',
    body: {login: login, psw: passwd, find: value}
  })).json()
}
