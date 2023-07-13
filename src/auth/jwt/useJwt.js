import useJwt from '@core/auth/jwt/useJwt'
import axios from '@axios'

const { jwt } = useJwt(axios, {loginEndpoint: '/auth/login'})
export default jwt
