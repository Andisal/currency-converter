class ConverterService {
    async getResource(url) {
        const res = await fetch(`https://api.exchangeratesapi.io/latest?base=${url}`)
        return res.json();
    }

}

export default ConverterService