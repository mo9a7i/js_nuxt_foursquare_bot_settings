const express = require('express')
const axios = require('axios').default;

const router = express.Router()

router.get('/' ,(req, res) => {
    res.write('Hey from swarm!');
    res.end()
})

router.post('/access_token' ,async (req, res) => {
    console.log('authenticate');
    try {
        var response = await axios.get('https://foursquare.com/oauth2/access_token',{ params: {
            client_id: req.body.client_id,
            client_secret: 'DK3KXOIRRPM3CGGXUYHEDTPVJDDNPDGDE0GYHUBWRCPNQLAG',
            grant_type: "authorization_code",
            redirect_uri: req.body.redirect_uri,
            code: req.body.code,
            v: '20220901'
        }})
        await res.json(response.data)
    } 
    catch (error) {
        console.log(error)
        res.write(JSON.stringify(error));
    }
    res.end()
})

router.get('/authorize' ,(req, res) => {
    console.log('authorize');
    //check if code exists
    
    res.write('Hey!');
    res.end()
})

router.get('/users/self' ,async (req, res) => {
    try {
        //console.log(req.headers.authorization);
        const auth_token = req.headers?.authorization;
        //console.log('here')
        var response = await axios.get('https://api.foursquare.com/v2/users/self',{ 
            params: {
                oauth_token: auth_token,
                v: '20220901'
            }})
        
        await res.json(response.data?.response)
    } 
    catch (error) {
        console.log(error)
        res.write(JSON.stringify(error));
    }

    res.end()
})

router.get('/callback' ,(req, res) => {

    //check if code exists
    let token =  $axios.get('/api/authenticate',{
        params: {
          client_id: 'OUYWUC4AHY4VSFCWA0EB055U3V4A01WYGRSAZ0MXLS0JKCUA',
          client_secret: 'DK3KXOIRRPM3CGGXUYHEDTPVJDDNPDGDE0GYHUBWRCPNQLAG',
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3000/api/swarm/callback',
          code: req.query.code,
          v: '20220910'
        }
    });
    res.write('Hey!');
    res.end()
})

module.exports = router
