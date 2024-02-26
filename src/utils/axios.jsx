import axios from "axios";

const instance =  axios.create({

    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzZhYWU0NzczYjkzMDk5OTlmZWNiOTdmZDQ3MGY0NSIsInN1YiI6IjY1ZDViYjc0ZGIxNTRmMDE2NGEwNmJjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5PQ1OGnp0-X2m5_JETzrFLNq2MWeJF8_JOE22EUyIiA'
      },
})

export default instance;