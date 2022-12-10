import request from '@/utils/request';

export default function logStep(item) {
	item.submit_time = new Date().getTime();
	request.post("/log", item);
};