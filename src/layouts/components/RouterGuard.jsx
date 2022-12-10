import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { UserInfo } from '@/contexts/user';
import request from '@/utils/request';
import { useLoading } from '@/contexts/loading';

export default function RouterGuard(props) {
	const router = useRouter();
	const { user, setUser } = UserInfo();
	const [loading, setLoading] = useState(true);
	const { showLoading, hideLoading } = useLoading();

	useEffect(() => {
		// showLoading();
		if (!user) {
			request.get("/user_info").then(function (response) {
				setLoading(false);
				// hideLoading();
				if (response.data && response.data.data) {
					setUser(response.data.data);
					if (router.pathname == "/login") router.push('/');
				} else {
					if (router.pathname != "/login") router.push('/login');
				}
			}).catch(function (error) {
				console.log(error);
				if (router.pathname != "/login") router.push('/login');
				setLoading(false);
				// hideLoading();
			});
		} else if (user && router.pathname == "/login") {
			router.push('/');
			setLoading(false);
			// hideLoading();
		} else {
			setLoading(false);
			// hideLoading();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (router.pathname == "/login")
		return (!user && !loading) ? (
			<>{props.children}</>
		) : <></>;
	else if (router.pathname == "/")
		return (user && !loading) ? (
			<>{props.children}</>
		) : <></>; 
	else
		return (user && user.name && user.gender && user.address && user.id_card && !loading) ? (
			<>{props.children}</>
		) : <></>; 
}
