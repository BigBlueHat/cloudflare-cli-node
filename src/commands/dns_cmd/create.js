import DNS from '../../classes/dns';
import log from '../../utils/logger';
import formatter from '../../utils/formatter';

exports.command = 'create <zoneId>';
exports.desc = 'Create a dns record for a zone';
exports.builder = {
	type: {
		default: 'A',
		describe: 'DNS record type, default A',
		type: 'string',
		demandOption: true,
	},
	name: {
		describe: 'DNS record name',
		type: 'string',
		demandOption: true,
	},
	content: {
		describe: 'DNS record content',
		type: 'string',
		demandOption: true,
	},
	ttl: {
		default: '1',
		describe: "Time to live for DNS record. Value of 1 is 'automatic'",
		type: 'string',
	},
	proxied: {
		default: true,
		describe:
			'Whether the record is receiving the performance and security benefits of Cloudflare, default: true',
		type: 'string',
	},
	priority: {
		default: 0,
		describe:
			'Used with some records like MX and SRV to determine priority. If you do not supply a priority for an MX record, a default value of 0 will be set',
		type: 'string',
	},
};
exports.handler = async function (argv) {
	try {
		const { type, name, content, ttl, proxied, priority, zoneId } = argv;

		const requestArgs = { type, name, content, ttl, proxied, priority, zoneId };

		const response = await DNS.create(requestArgs);

		formatter.toJson(response.result);
	} catch (err) {
		log.error(err);
	}
};
