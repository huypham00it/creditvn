// eslint-disable-next-line import/no-anonymous-default-export
export default function (value, symbol) {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
}