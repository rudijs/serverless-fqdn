## serverless-fqdn

Boilerplate/seed project for serverless.com nodejs api.

Features:

1. serverless.com framwork with nodejs
2. Typescript support
3. es6 code syntax
4. Unit tests with Jest/Mocha with HTML coverage report
5. Webpack build so code is inlined with minimal bundle size (everything is in package.json devDependencies)
6. Custom URL support for multi enviromnet deployments (AWS hosted domain and AWS TLS certificate): Example
   - dev = dev-api.domainname.com
   - prod = api.domianname.com

## Setup

- `npm i -g serverless`
- `git clone git@github.com:rudijs/serverless-fqdn.git`
- `cd serverless-fqdn`
- `npm install`

## Unit Tests

- `npm test`

## Deployment

- cd into a serverless "service" (aka microservice or group of related functions)
- `cd src/users`

Configure dev and prod api URLs

- `sls create_domain --stage dev`
- `sls create_domain --stage prod`

Example output above:

```
Serverless: Custom domain api.rudijs.com was created.
            New domains may take up to 40 minutes to be initialized.
```

Deploy serverless api

- `sls deploy --stage dev`
- `sls deploy --stage prod`

From the output above you can call the URLs direct using the `*.amazonaws.com/dev/users` URL.

Wait for a few minutes for the DNS to setup/propagate then try the custom URLs from the output.

- `curl https://dev-api.rudijs.com/users`
- `curl https://api.rudijs.com/users`

## Removal

Delete domain names:

- `sls delete_domain --stage dev`
- `sls delete_domain --stage prod`

Example command output:

`Serverless: Custom domain api.rudijs.com was deleted.`

Delete serverless code

- `sls remove --stage dev`

Example command output:

```
Serverless: Unable to remove basepath mapping.
Serverless: Getting all objects in S3 bucket...
Serverless: Removing objects in S3 bucket...
Serverless: Removing Stack...
Serverless: Checking Stack removal progress...
................
Serverless: Stack removal finished...
```
