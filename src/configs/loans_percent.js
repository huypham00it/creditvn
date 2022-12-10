import tamo from '@/assets/img/tamo.svg';
import takomo from '@/assets/img/takomo.svg';
import findo from '@/assets/img/findo.svg';
import lotte from '@/assets/img/lotte.svg';
import vamo from '@/assets/img/vamo.svg';
import mcredit from '@/assets/img/mcredit.svg';
import oncredit from '@/assets/img/oncredit.svg';
import robocash from '@/assets/img/robocash.svg';
import senmo from '@/assets/img/senmo.svg';
import miraeasset from '@/assets/img/miraeasset.svg';
import ptf from '@/assets/img/ptf.svg';

const loans_percent = [
	{
		name: "takomo",
		img: takomo,
		percent: 84,
		offer_id: "takomocpql",
		loan_type: "short",
		label: "Takomo",
		path: "/takomo",
		type: "redirect"
	},
	{
		name: "tamo",
		img: tamo,
		percent: 84,
		offer_id: "tamo-2",
		loan_type: "short",
		label: "Tamo",
		path: "/tamo",
		type: "redirect"
	},
	{
		img: findo,
		percent: 33,
		loan_type: "short",
		offer_id: "findo",
		name: "findo",
		type: "redirect"
	},
	{
		img: lotte,
		percent: 17,
		loan_type: "long",
		name: "lotte",
		offer_id: "lottefinance",
		type: "inline",
		path: "/lotte-finance",
		label: "Lotte Finance"
	},
	{
		name: "mcredit",
		img: mcredit,
		percent: 90,
		offer_id: "dcredit-2",
		loan_type: "long",
		label: "Mcredit",
		path: "/mcredit",
		type: "inline"
	},
	{
		name: "oncredit",
		img: oncredit,
		percent: 85,
		offer_id: "oncredit-web-2",
		loan_type: "short",
		label: "Oncredit",
		path: "/oncredit",
		type: "redirect"
	},
	{
		name: "robocash",
		img: robocash,
		percent: 65,
		offer_id: "robocash-2",
		loan_type: "short",
		label: "Robocash",
		path: "/robocash",
		type: "redirect"
	},
	{
		name: "senmo",
		img: senmo,
		percent: 0,
		offer_id: "senmo",
		loan_type: "short",
		label: "Senmo",
		path: "/senmo",
		type: "redirect"
	},
	// {
	// 	name: "mafc",
	// 	img: miraeasset,
	// 	percent: 30,
	// 	offer_id: "mafc2",
	// 	loan_type: "long",
	// 	label: "Mirae Asset Finance Vietnam",
	// 	path: "/mafc"
	// },
	{
		name: "vamo",
		img: vamo,
		percent: 30,
		offer_id: "vamo",
		loan_type: "short",
		label: "Vamo",
		path: "/vamo",
		type: "redirect"
	},
	{
		img: ptf,
		loan_type: "long",
		name: "ptf",
		offer_id: "ptf",
		type: "inline",
		path: "/ptf",
		label: "PTF"
	},
]

export default loans_percent;