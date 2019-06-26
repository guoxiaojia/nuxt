export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        console.log(111111)
    });
    $axios.onResponse(response => {

    });
    $axios.onError(error => {
        if(error.response.status === 500) {
        redirect('/sorry')
        }
    });
}