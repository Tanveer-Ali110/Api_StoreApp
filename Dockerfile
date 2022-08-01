FROM mcr.microsoft.com/azure-functions/node:4-node16
# FROM mcr.microsoft.com/azure-functions/node:2.0

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true


COPY . /home/site/wwwroot

# COPY src /home/site/wwwroot/src
# COPY storage/models/* /home/site/wwwroot/storage/models/*

# RUN cd //home/site/wwwroot && npm run build

RUN cd //home/site/wwwroot && \
    npm install