# Automated-Email-AI-Tool
This is a tool that will parse and check the emails in a Google and Outlook email ID, and responds to the e-mails based on the context using AI.

#Project Setup
1}Create a new project directory:
bash
Copy code
mkdir email-automation-tool
cd email-automation-tool

2]Initialize a new Node.js project:
bash
Copy code
npm init -y

3]Install necessary dependencies:
bash
Copy code
npm install express typescript @types/node nodemon bullmq googleapis @microsoft/microsoft-graph-client isomorphic-fetch openai

4]Set up TypeScript:
bash
Copy code
npx tsc --init

5]Install TypeScript dev dependencies:
bash
Copy code
npm install --save-dev ts-node @types/express @types/bullmq



6]Configure tsconfigjson:

json
Copy code
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    }
}
