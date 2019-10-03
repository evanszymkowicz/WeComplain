import axios  from "axios"
import { config } from "../constants/config"

export function fetchEmployees() {
	return axios.get(`${config.API_END_POINT}/v1/employees/directory`)
}

export function fetchDesks() {
	return axios.get(`${config.API_END_POINT}/v1/desks`)
}
