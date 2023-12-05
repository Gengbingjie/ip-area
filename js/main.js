let ipDom = document.getElementById('ip')
let country = document.getElementById('country')
let region = document.getElementById('region')
let city = document.getElementById('city')
let timezone = document.getElementById('timezone');

setData()

document.getElementById('search').onclick = () => {
    setData(ipDom.value)
}
function getData(ip) {
    let url = ip ? `${location.origin}/api/ip?ip=${ip}` : `${location.origin}/api/ip`
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err))
    })

}
async function setData(ip) {
    let info = await getData(ip)
    console.log(info)
    ipDom.value = info.ip
    country.textContent = info.country
    region.textContent = info.region
    city.textContent = info.city
    timezone.textContent = info.timezone
}
