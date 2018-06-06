import { Router } from 'express';
import { ChainStateProvider } from '../providers/chain-state';
const router = Router({ mergeParams: true });

router.get('/', function(req, res) {
  let { chain, network } = req.params;
  return res.status(404).send(`Endpoint not found in the network ${chain}-${network}`);
});

router.get('/metadata/:hex', async function(req, res) {
  let { chain, network, hex } = req.params;
    if (!chain || !network) {
      return res.status(400).send('Missing required param');
    }
    try {
      let payload = {
          chain,
          network,
          hex
        };
      let metadata = await ChainStateProvider.lookupMetadata(payload);
      return res.json(metadata);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

module.exports = {
  router: router,
  path: '/opcodes'
};
