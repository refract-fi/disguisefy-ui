import axios from 'axios';

const API_KEY = process.env.REST_API_KEY;
const API_URL = process.env.REST_API_URL;
const SECONDS_IN_A_DAY = 86400;

export default function handler(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            const body = {
                address: req.query.address || false,
                name: req.query.name || '',
                duration: req.query.duration || SECONDS_IN_A_DAY,
                preset: req.query.preset || 10,
                isGroupAssetsUnder: Boolean(req.query.isGroupAssetsUnder) || false,
                groupAssetsUnder: Number(req.query.groupAssetsUnder) || 0.1,
                ignoreNFTs: Boolean(req.query.ignoreNFTs) || false,
                isSnapshot: Boolean(req.query.isSnapshot) || false,
                showNFTCollections: Boolean(req.query.showNFTCollections) || false,
                chains: req.query.chains || ['all'],
                assetCategories: req.query.assetCategories || ['all']
            };
            
            const options = {
                headers: { 'x-api-key': API_KEY }
            };

            if(!body.address || body.address == '') { // should create a function to test validity of address
                throw new Error("[WebService]: Invalid address.");
            }

            let response = await axios.post(`${API_URL}/disguises/generate`, body, options);
            let disguise = response.data;

            if(disguise?.url) {
                res.redirect(`/${disguise.url}/assets`);
            } else {
                throw new Error("[WebService]: Could not generate disguise.");
            }
        } catch(e) {
            console.log(e)
        } finally {
            resolve(true);
        }
    });   
}