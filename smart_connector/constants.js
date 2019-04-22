'use strict'

var io = {}

io.data = {
    integration: {
        "install": [{
            "name": "NetSuite Connection",
            "description": "Configure NetSuite account credentials",
            "imageURL": "https://netsuiteblogs.curiousrubik.com/hubfs/1_NetSuiteBlogs.CuriousRubik.Com/Blog%20images/Netsuite1.gif",
            "completed": false,
            "installerFunction": "verifyNetSuiteConnection",
            "uninstallerFunction": "integrationUninstallerFunction",
            "_connectionId": "Netsuite connection Id"
        }],
        "mode": "install",
    },

    network: {
        "token_header": "Authorization",
        "token_value": "Bearer 8eb4cab8f90444939b824e4320037442",
        "content_header": "Content-Type",
        "content_value": "application/json",
        "url": "https://api.staging.integrator.io/v1/"
    },

    connections: {
        "type": "netsuite",
        "name": "netsuite",
        "externalId": "io_netsuite_mimick_connection_netsuite",
        "netsuite": {
            "account": "TSTDRV1323007",
            "roleId": "3",
            "email": "mukesh.sharma@celigo.com",
            "password": "******",
            "environment": "production",
            "requestLevelCredentials": false,
            "dataCenterURLs": {
                "restDomain": "https://tstdrv1323007.restlets.api.netsuite.com",
                "webservicesDomain": "https://tstdrv1323007.suitetalk.api.netsuite.com",
                "systemDomain": "https://tstdrv1323007.app.netsuite.com"
            },
            "wsdlVersion": "current",
            "concurrencyLevel": 1
        }
    },

    exports: {
        "name": "Netsuite Customers",
        "description": "Fetch all individual customers",
        "_connectionId": "Netsuite connection id",
        "externalId": "io_netsuite_mimick_export_netsuite",
        "apiIdentifier": "e6204ac2b6",
        "asynchronous": true,
        "sampleData": {
            "email": "aa@fake-email.com",
            "entityId": "Aaron Abbott",
            "phone": "(303) 464-4122",
            "custentity_cust_priority": 50
        },
        "netsuite": {
            "type": "search",
            "searches": [{
                "savedSearchId": "60994",
                "recordType": "customer",
                "criteria": []
            }],
            "skipGrouping": true,
            "statsOnly": false,
            "distributed": {
                "disabled": false,
                "forceReload": false
            }
        },
        "transform": {
            "type": "expression",
            "expression": {
                "version": "1"
            },
            "version": "1"
        },
        "filter": {
            "type": "expression",
            "expression": {
                "rules": [],
                "version": "1"
            },
            "version": "1",
            "rules": []
        },
        "inputFilter": {
            "type": "expression",
            "expression": {
                "version": "1"
            },
            "version": "1"
        },
        "adaptorType": "NetSuiteExport"
    },

    imports: {
        "name": "Netsuite Customers Import",
        "description": "Import all standard customers to record custom type",
        "responseTransform": {
            "type": "expression",
            "expression": {
                "version": "1"
            },
            "version": "1"
        },
        "_connectionId": "io_netsuite_mimick_import_netsuite",
        "distributed": true,
        "apiIdentifier": "i3163d36c3",
        "hooks": {
            "preMap": {
            "_stackId": "5ca1e05518010f730b6721fa",
            "function": "preMapFunction"
            }
        },
        "lookups": [],
        "netsuite_da": {
            "operation": "add",
            "recordType": "customrecord736",
            "lookups": [],
            "mapping": {
                "fields": [{
                    "generate": "name",
                    "extract": "['entityId']",
                    "internalId": false,
                    "immutable": false,
                    "discardIfEmpty": false
                }],
                "lists": []
            }
        },
        "filter": {
            "type": "expression",
            "expression": {
                "version": "1"
            },
            "version": "1"
        },
        "adaptorType": "NetSuiteDistributedImport"
    },

    flows: {
        "name": "NetSuite to NetSuite",
        "disabled": false,
        "skipRetries": false,
        "pageProcessors": [{
            "responseMapping": {
                "fields": [],
                "lists": []
            },
            "type": "import",
            "_importId": "import netsuite id"
        }],
        "pageGenerators": [{
            "_exportId": "export netsuite id"
        }],
        "wizardState": "done"
    },

    integrationDoc: false
}

io.ui = {

    settings: {
        sections: [{
            fields: [{
                    "value": false,
                    "name": "exports_unique_delta_all",
                    "type": "checkbox",
                    "tooltip": "If checked, connector tells netsuite exports to export delta data instead of all data export",
                    "label": "Delta Export"
                },
                {
                    "options": [
                        ["1", "Mr"]
                    ],
                    "supportsRefresh": true,
                    "name": "exports_unique_name_prefix",
                    "type": "select",
                    "value": "1",
                    "label": "Name Prefix"
                }
            ],
            flows: [{
                "showSchedule": true,
                "showMapping": true,
                "_id": "IO Netsuite mimick Flow id"
            }],
        }]
    },

    metadata : [
        ["1", "Mr"],
        ["2", "Mrs"],
        ["3", "Ms"]
    ]
}

io.globals = {

}

module.exports = io;