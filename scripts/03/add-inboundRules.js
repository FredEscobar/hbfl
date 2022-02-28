// Imports
const {
    EC2Client,
    AuthorizeSecurityGroupIngressCommand,
    CreateKeyPairCommand,
    CreateSecurityGroupCommand,
    RunInstancesCommand
} = require('@aws-sdk/client-ec2')
const helpers = require('./helpers')

function sendCommand(command) {
    const client = new EC2Client({
        region: process.env.AWS_REGION
    })
    return client.send(command);
}

// Declare local variables
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

// Do all the things together


// Create functions
async function updateSecurityGroup() {
    const sgId = 'sg-017742e2a7d66f6e7'

    const rulesParms = {
        GroupId: sgId,
        IpPermissions: [
            {
                IpProtocol: 'tcp',
                FromPort: 22,
                ToPort: 22,
                IpRanges: [{ CidrIp: '0.0.0.0/0' }]
            },
            {
                IpProtocol: 'tcp',
                FromPort: 3000,
                ToPort: 3000,
                IpRanges: [{ CidrIp: '0.0.0.0/0' }]
            }
        ]
    }

    const authCommand = new AuthorizeSecurityGroupIngressCommand(rulesParms);


    const result = await sendCommand(authCommand);
    console.log(result)
}



updateSecurityGroup();