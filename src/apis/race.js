import axios from 'axios';
import { BASE_URL } from './config';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const createRace = data => api.post('/api/races', data).then(res => res.data);

export const distributeCards = raceId => api.post(`/api/races/${raceId}/hands`);

export const submitCard = (raceId, round, data) =>
  api.post(`/api/races/${raceId}/cards?round=${round}`, data);

export const judgeRound = (raceId, roundNumber) =>
  api.post(`/api/races/${raceId}/rounds/${roundNumber}/results`).then(res => res.data);

export const getRaceStatus = raceId => api.get(`/api/races/${raceId}/status`).then(res => res.data);

export const getPlayerHand = raceId =>
  api.get(`/api/races/${raceId}/player/hand`).then(res => res.data);
