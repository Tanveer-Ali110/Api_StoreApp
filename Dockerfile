FROM mcr.microsoft.com/azure-functions/node:4
# FROM mcr.microsoft.com/azure-functions/node:2.0

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY . /home/site/wwwroot

# ADD local.settings*.json /home/site/wwwroot/
# ADD ./src/utils/* /home/site/wwwroot/src/utils
# ADD ./src/constant.ts /home/site/wwwroot/src/
# ADD ./storage/models/* /home/site/wwwroot/storage/models
# ADD ./storage/tables/* /home/site/wwwroot/storage/tables

RUN cd //home/site/wwwroot && \
    npm install
