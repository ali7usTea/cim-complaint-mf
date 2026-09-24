export const NO_FILTER = 'No Filter';

export const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const mockedCategories = [
    {
        code: 'Request',
        description: 'Request',
        natures: [
            {
                code: 'CNA02_Con_Req_Mis',
                description: 'Miscellaneous Request - Consumers',
                types: [
                    {
                        code: 'CT02_CNA02_Con_Req_Mis',
                        description: 'Reconnection',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA02_Req_Mis',
                description: 'Miscellaneous Request - CC Outbound',
                types: [
                    {
                        code: 'CT04_CNA02_Req_Mis',
                        description: 'Adjustment Request',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT05_CNA02_Req_Mis',
                        description: 'SR Error',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    }
                ]
            },
            {
                code: 'CNA100_RaAlarm',
                description: 'Individual RA alarms',
                types: [
                    {
                        code: 'CNA02_CNA100_RaAlarm',
                        description: 'RA underbilled issue',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CNA01_CNA100_RaAlarm',
                        description: 'Individual Customer Under system alarms',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA110_ReqCC_MobileTheft',
                description: 'Mobile Theft',
                types: [
                    {
                        code: 'CT01_CNA110_ReqCC_MobileTheft',
                        description: 'Mobile Theft',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA61_Spon',
                description: 'Sponsorship Request',
                types: [
                    {
                        code: 'CT01_CNA61_Spon',
                        description: 'Sponsorship Request',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA02_Con_Req_Fix',
                description: 'Miscellaneous Request',
                types: [
                    {
                        code: 'CT06_CNA02_Con_Req_Fix',
                        description: 'Retention-Churn',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    }
                ]
            },
            {
                code: 'CNA28_Req_BT',
                description: 'Balance Transfer Request',
                types: [
                    {
                        code: 'CT01_CNA28_Req_BT',
                        description: 'Different Party ID- Payment to wrong account',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT13_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Prepaid to Written off Account',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT07_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Postpaid to Fixed Line Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Fixed Line to Written off Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Fixed Line to Prepaid Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA28_Req_BT',
                        description: 'Different Party ID- Transfer to different Account',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT12_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Prepaid to Prepaid off Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT11_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Prepaid to Postpaid off Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT15_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Written off to Postpaid Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT10_CNA28_Req_BT',
                        description: 'Same Party Id - Prepaid to Postpaid Account',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT04_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Fixed Line to Postpaid Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT14_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Written off to Fixed Line Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT16_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Written off to Prepaid Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Postpaid to Prepaid Account',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT17_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Written off to Written off Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT18_CNA28_Req_BT',
                        description: 'Same party Id - Postpaid to postpaid Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT09_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Postpaid to Written off Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA28_Req_BT',
                        description: 'Same party Id &nbsp;- Fixed Line to Fixed line Account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA38_Req_FN',
                description: 'Fixed Line Request- CC Outbound New',
                types: [
                    {
                        code: 'CT01_CNA38_Req_FN',
                        description: 'New Elife CCC',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT04_CNA38_Req_FN',
                        description: 'Unable to Process',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT03_CNA38_Req_FN',
                        description: 'Shifting',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT02_CNA38_Req_FN',
                        description: 'D2D Elife',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA48_Req_SL',
                description: 'Sales leads - Inbound Team',
                types: [
                    {
                        code: 'CT01_CNA48_Req_SL',
                        description: 'Telesales Leads',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA73_Urequest',
                description: 'Unable To Process Request - Consumer',
                types: [
                    {
                        code: 'CT01_CNA73_Urequest',
                        description: 'Unable To Process Muaamalati Request - Consumer',
                        specialFields: null,
                        sla: '{"all":"","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA79_Req_Can',
                description: '101 Account Cancellation Request',
                types: [
                    {
                        code: 'CT01_CNA79_Req_Can',
                        description: 'Account Cancellation Request',
                        specialFields: null,
                        sla: '{"all":"","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA02_Pre_Req_Mis',
                description: 'Miscellaneous Request',
                types: [
                    {
                        code: 'CT01_CNA02_Pre_Req_Mis',
                        description: 'Callback Request',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA02_Pre_Req_Mis',
                        description: 'Roaming Refund',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT02_CNA02_Pre_Req_Mis',
                        description: 'Reconnection',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    }
                ]
            },
            {
                code: 'CNA33_Req_EPRR',
                description: 'Excess Payment Refund Request- Roaming',
                types: [
                    {
                        code: 'CT01_CNA33_Req_EPRR',
                        description: 'Roaming deposit refund',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA140_Spam_req',
                description: 'Spam Voice call ',
                types: [
                    {
                        code: 'CT01_CNA140_Spam_req',
                        description: 'Unwanted Promotional calls by Third Party',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT03_CNA140_Spam_req',
                        description: 'Malicious Call',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT02_CNA140_Spam_req',
                        description: 'Unwanted Promotional call by Etisalat',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA03_Con_Req_Fix',
                description: 'Mobile Requests',
                types: [
                    {
                        code: 'CT03_CNA03_Con_Req_Fix',
                        description: 'Suspected Outage',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    }
                ]
            },
            {
                code: 'CNA51_FCR_Req',
                description: 'BEYOND SCOPE OF SUPPORT-DEFLECTION',
                types: [
                    {
                        code: 'CT01_CNA51_FCR_Req',
                        description: 'BEYOND SCOPE OF SUPPORT-DEFLECTION',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA60_STFAccount',
                description: 'Staff Accountability Post-action',
                types: [
                    {
                        code: 'CT014_CNA60_STFAccount',
                        description: 'BackOffice-Telesales&amp;Device-Ajman',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA60_STFAccount',
                        description: 'Prestige &amp; Emirati Gold-Ajman ',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA60_STFAccount',
                        description: 'Voice Inbound-Concentrix',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT010_CNA60_STFAccount',
                        description: 'ServiceRecovery-Intelenet',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA60_STFAccount',
                        description: 'AllDeparmtments-RayaDOC',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT09_CNA60_STFAccount',
                        description: 'Retention',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT013_CNA60_STFAccount',
                        description: 'Telesales',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA60_STFAccount',
                        description: 'Voice Inbound-Intelenet',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA60_STFAccount',
                        description: 'Voice Inbound-RayaCairo',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT012_CNA60_STFAccount',
                        description: 'ServiceRecovery-Ajman',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA60_STFAccount',
                        description: 'Non-VoiceSocial Media-Ajman',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT016_CNA60_STFAccount',
                        description: 'BackOffice-Provisioning&amp;Retention-RayaCairo',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT015_CNA60_STFAccount',
                        description: 'BackOffice-Provisioning&amp;Retention-Ajman',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA60_STFAccount',
                        description: 'Collections',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA60_STFAccount',
                        description: 'Non-VoiceEmailChat-Ajman',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT011_CNA60_STFAccount',
                        description: 'ServiceRecovery-RayaCairo',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA52_Req_FLTE',
                description: 'Fixed LTE Migration',
                types: [
                    {
                        code: 'CT01_CNA52_Req_FLTE',
                        description: 'Fixed LTE Migration - New/SIM CHANGE/MIGRATION',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA53_REQ_FCR',
                description: 'Backoffice Productivity Report- FCR',
                types: [
                    {
                        code: 'CT01_CNA53_REQ_FCR',
                        description: 'Backoffice Productivity - NON CBCM FCR',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA63_FCR_Req',
                description: 'Critical Incident ',
                types: [
                    {
                        code: 'CT01_CNA63_FCR_Req',
                        description: 'Critical Incident Description',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA35_Req_FixN',
                description: 'Fixed Line Request - New',
                types: [
                    {
                        code: 'CT01_CNA35_Req_FixN',
                        description: 'New Al Shamil',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT03_CNA35_Req_FixN',
                        description: 'New One Play',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT04_CNA35_Req_FixN',
                        description: 'New Double/Triple Play',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT02_CNA35_Req_FixN',
                        description: 'New DEL',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT06_CNA35_Req_FixN',
                        description: 'New Double/Triple Play - VVIP',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT05_CNA35_Req_FixN',
                        description: 'New One Play - VVIP',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA67_VVIP',
                description: 'Prestige VVIP Requests',
                types: [
                    {
                        code: 'CT08_CNA67_VVIP',
                        description: 'VVIP Sales Lead - Telesales',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA43_Req_MR',
                description: 'Mobile Request- CC Outbound',
                types: [
                    {
                        code: 'CT06_CNA43_Req_MR',
                        description: 'MNP Port IN D2D',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT04_CNA43_Req_MR',
                        description: 'Mobile Device via CCC',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT03_CNA43_Req_MR',
                        description: 'New SIM',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT09_CNA43_Req_MR',
                        description: 'Unable to Process',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT05_CNA43_Req_MR',
                        description: 'New Postpaid acquisition consumer',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT02_CNA43_Req_MR',
                        description: 'MGM Referral',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT07_CNA43_Req_MR',
                        description: 'iPhone for life ',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA43_Req_MR',
                        description: 'iPhone for life ',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA45_Req_Plan',
                description: 'Mobile Request- CC Outbound Plan',
                types: [
                    {
                        code: 'CT01_CNA45_Req_Plan',
                        description: 'Postpaid PlanUpgarde Downgrade - Futuredated',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA49_Req_CB',
                description: 'Urdu/Malayalam Call Back',
                types: [
                    {
                        code: 'CT01_CNA49_Req_CB',
                        description: 'UrduMalayalam Call Back',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA01_Req_Fix',
                description: 'Fixed Requests - CC Outbound',
                types: [
                    {
                        code: 'CT12_CNA01_Req_Fix',
                        description: 'New DEL',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT18_CNA01_Req_Fix',
                        description: 'Shifting',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT06_CNA01_Req_Fix',
                        description: 'New One Play',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT03_CNA01_Req_Fix',
                        description: 'New Elife',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT15_CNA01_Req_Fix',
                        description: 'Migration and upgrade',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT09_CNA01_Req_Fix',
                        description: 'New Alshamil',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    }
                ]
            },
            {
                code: 'CNA32_Req_EPR',
                description: 'Excess Payment Refund Request',
                types: [
                    {
                        code: 'CT03_CNA32_Req_EPR',
                        description: 'Account Adjustment (For Roaming Deposit)',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA32_Req_EPR',
                        description: 'Cash Refund',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA32_Req_EPR',
                        description: 'Bank Transferal',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT04_CNA32_Req_EPR',
                        description: 'Credit Debit card reversal',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA72_Urequst',
                description: 'Unable To Process Request - Prestige',
                types: [
                    {
                        code: 'CT01_CNA72_Urequst',
                        description: 'Unable To Process Muaamalati Request - Prestige',
                        specialFields: null,
                        sla: '{"all":"","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA66_AddDel',
                description: 'Emirati - Add/Delete Request',
                types: [
                    {
                        code: 'CT01_CNA66_AddDel',
                        description: 'Emirati - Add/Delete Request',
                        specialFields: null,
                        sla: '{"all":"","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA47_Req_ROT',
                description: 'Retention Outbound Team',
                types: [
                    {
                        code: 'CT01_CNA47_Req_ROT',
                        description: 'Retention Out bound Tier 2',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA46_Req_VOC',
                description: 'Prestige VOC',
                types: [
                    {
                        code: 'CT01_CNA46_Req_VOC',
                        description: 'Prestige VOC',
                        specialFields: null,
                        sla: '{"all":"","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA29_Req_Churn',
                description: 'Churn Request- Inbound Team',
                types: [
                    {
                        code: 'CT02_CNA29_Req_Churn',
                        description: 'Post To Pre Migration (Tier1)- Not Retained',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA29_Req_Churn',
                        description: 'Churn Related Form ( Tier 1)',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA29_Req_Churn',
                        description: 'Post To Pre Migration - VVIP',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT04_CNA29_Req_Churn',
                        description: 'Account Cessation',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA04_Req_Med',
                description: 'Social Media',
                types: [
                    {
                        code: 'CT01_CNA04_Req_Med',
                        description: 'Social Media/Email Leads',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    }
                ]
            },
            {
                code: 'CNA51_ReqSW_FCR',
                description: 'Swift Desk',
                types: [
                    {
                        code: 'CT01_CNA51_ReqSW_FCR',
                        description: 'Transaction Details',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA41_Req_KC',
                description: 'Knowledge Clarification',
                types: [
                    {
                        code: 'CT01_CNA41_Req_KC',
                        description: 'Knowledge Clarification',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA57_FCR_WC',
                description: 'World Cup Leads',
                types: [
                    {
                        code: 'CT01_CNA57_FCR_WC',
                        description: 'World Cup Leads',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA50_FCR_Req',
                description: 'Telesales Outbound FCR',
                types: [
                    {
                        code: 'CT01_CNA50_FCR_Req',
                        description: 'Telesales Outbound FCR',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA03_Req_Wir',
                description: 'Mobile Requests - CC Outbound',
                types: [
                    {
                        code: 'CT01_CNA03_Req_Wir',
                        description: 'New Device with Existing SIM',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT02_CNA03_Req_Wir',
                        description: 'Re-Registration',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    }
                ]
            },
            {
                code: 'CNA05_Req_Chat',
                description: 'Email/Chat',
                types: [
                    {
                        code: 'CT01_CNA05_Req_Chat',
                        description: 'Cancellation From abroad',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA30_Req_DOP',
                description: 'DOP Prestige',
                types: [
                    {
                        code: 'CT01_CNA30_Req_DOP',
                        description: 'DOP Prestige',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA123_CRLim',
                description: 'Change Credit Limit',
                types: [
                    {
                        code: 'CNA01_CNA123_CRLim',
                        description: 'Change Credit Limit',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA42_Req_Loy',
                description: 'Loyalty Request',
                types: [
                    {
                        code: 'CT03_CNA42_Req_Loy',
                        description: 'Update membership details',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA42_Req_Loy',
                        description: 'Linkdelink accounts',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT02_CNA42_Req_Loy',
                        description: 'Merge memberships',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA68_NVSuper',
                description: 'Supervior Escalation - NV Email &amp; Chat',
                types: [
                    {
                        code: 'CT01_CNA68_NVSuper',
                        description: 'Non Voice Email &amp; Chat - Ajman',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT02_CNA68_NVSuper',
                        description: 'Non Voice Email &amp; Chat - Egypt',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA31_Req_Ebill',
                description: 'Ebill to Paper Request',
                types: [
                    {
                        code: 'CT01_CNA31_Req_Ebill',
                        description: 'Switch From eBill To Paper Bill',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA56_Chairman',
                description: 'Chairman Team Tracker',
                types: [
                    {
                        code: 'CT02_CNA56_Chairman',
                        description: 'TRA Media Tracker',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA56_Chairman',
                        description: 'Chairman Team Tracker',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA76_BC_ROB',
                description: 'BC-Robotics',
                types: [
                    {
                        code: 'CT04_CNA76_BC_ROB',
                        description: 'Reconnection',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA01_Con_Req_Fix',
                description: 'Fixed Requests',
                types: [
                    {
                        code: 'CT13_CNA01_Con_Req_Fix',
                        description: 'Migration and upgrade',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT04_CNA01_Con_Req_Fix',
                        description: 'New One Play',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT16_CNA01_Con_Req_Fix',
                        description: 'Shifting',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT10_CNA01_Con_Req_Fix',
                        description: 'New DEL',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT01_CNA01_Con_Req_Fix',
                        description: 'New Elife',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT23_CNA01_Con_Req_Fix',
                        description: 'Suspected Outage',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    },
                    {
                        code: 'CT07_CNA01_Con_Req_Fix',
                        description: 'New Alshamil',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    }
                ]
            },
            {
                code: 'CNA153_ValSeg',
                description: 'Manage Consumer Value Segment',
                types: [
                    {
                        code: 'CT01_CNA153_ValSeg',
                        description: 'Execlude Account from Mothly value segment change Job.',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA40_Req_FM',
                description: 'Fixed or Mobile Line Request',
                types: [
                    {
                        code: 'CT01_CNA40_Req_FM',
                        description: 'Future Date Order',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA62_Swift',
                description: 'Swift Desk',
                types: [
                    {
                        code: 'CT01_CNA62_Swift',
                        description: 'Case Follow Up',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA100_CallBack',
                description: 'CC – Callback Request',
                types: [
                    {
                        code: 'CNA01_CNA100_CallBack',
                        description: 'CC – Callback Request',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA03_Pre_Req_Wir',
                description: 'Retention Inbound Call Tagging',
                types: [
                    {
                        code: 'CT05_CNA03_Pre_Req_Wir',
                        description: 'Retention inbound Call Tagging GSM',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            }
        ]
    },
    {
        code: 'Customer Service',
        description: 'Customer Service',
        natures: [
            {
                code: 'CNA318_StaffMis',
                description: 'Staff Mistake/Unauthorized Action ',
                types: [
                    {
                        code: 'CT04_CNA318_StaffMis',
                        description: 'Reseller',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA318_StaffMis',
                        description: 'Customer Care ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA318_StaffMis',
                        description: 'Retail',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA318_StaffMis',
                        description: 'Franchise',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA319_WrongINF',
                description: 'Wrong Information',
                types: [
                    {
                        code: 'CT03_CNA319_WrongINF',
                        description: 'Retail',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA319_WrongINF',
                        description: 'Reseller',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA319_WrongINF',
                        description: 'Customer Care ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA319_WrongINF',
                        description: 'Franchise',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA317_Behav',
                description: 'Behavior',
                types: [
                    {
                        code: 'CT05_CNA317_Behav',
                        description: 'Fleet Management ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA317_Behav',
                        description: 'Reseller',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA317_Behav',
                        description: 'Customer Care ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA317_Behav',
                        description: 'Retail',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA317_Behav',
                        description: 'Etisalat Logistic Partner',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA317_Behav',
                        description: 'Franchise',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            }
        ]
    },
    {
        code: 'Digital',
        description: 'Digital',
        natures: [
            {
                code: 'CNA324_mwallet',
                description: 'mwallet',
                types: [
                    {
                        code: 'CT03_CNA324_mwallet',
                        description: 'Application Crashing',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA324_mwallet',
                        description: 'credit card issues',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA324_mwallet',
                        description: 'login issues ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA324_mwallet',
                        description: 'Registration ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA324_mwallet',
                        description: 'unable to pay',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA320_Cme',
                description: 'Cme',
                types: [
                    {
                        code: 'CT04_CNA320_Cme',
                        description: 'No incoming or outgoing',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA320_Cme',
                        description: 'Registration ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA320_Cme',
                        description: 'Call Quality Issues/Drop Calls ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA320_Cme',
                        description: 'login issues ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA320_Cme',
                        description: 'Application Crashing/Issues',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA322_UAEAPP',
                description: 'Etisalat UAE App',
                types: [
                    {
                        code: 'CT01_CNA322_UAEAPP',
                        description: 'Application Crashing',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA322_UAEAPP',
                        description: 'unable to view (Usage,Invoice)',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA322_UAEAPP',
                        description: 'Unable to pay',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA322_UAEAPP',
                        description: 'Unable to Chat',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA322_UAEAPP',
                        description: 'Transaction Issues (IBT,mParking, Rewards,subscription)',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA322_UAEAPP',
                        description: 'Registration ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA322_UAEAPP',
                        description: 'login issues ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA325_Online',
                description: 'Online Services',
                types: [
                    {
                        code: 'CT03_CNA325_Online',
                        description: 'Unable to pay',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA325_Online',
                        description: 'MobilePay &amp; AutoPay',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT09_CNA325_Online',
                        description: 'Site Crashing',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA325_Online',
                        description: 'Registration ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT10_CNA325_Online',
                        description: 'credit card issues',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA325_Online',
                        description: 'login issues ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA325_Online',
                        description: 'Unable to reset the internet acct password',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA325_Online',
                        description: 'Unable to Chat',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA325_Online',
                        description: 'Linking Delinking',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA325_Online',
                        description: 'Unable to view (Usage,Invoice)',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            }
        ]
    },
    {
        code: 'Online',
        description: 'Online',
        natures: [
            {
                code: 'CNA39_ESHOP',
                description: 'Etisalat.ae portal',
                types: [
                    {
                        code: 'CT01_CNA39_ESHOP',
                        description: 'Issue related to Auto-pay / Mobile-pay',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            }
        ]
    },
    {
        code: 'Provisioning',
        description: 'Provisioning',
        natures: [
            {
                code: 'CNA327_ReqNp',
                description: 'Request not Processed for account',
                types: [
                    {
                        code: 'CT04_CNA327_ReqNp',
                        description: 'MNP Issues',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA327_ReqNp',
                        description: 'Migration ',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA327_ReqNp',
                        description: 'Registration',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA327_ReqNp',
                        description: 'SIM Replacement ',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA327_ReqNp',
                        description: 'MNP Delay in activation',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA139_FLT_DOD',
                description: 'Fleet Team-delay of delivery',
                types: [
                    {
                        code: 'CT01_CNA139_FLT_DOD',
                        description: 'SR not reached to Fleet Team',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA59_N_SIMPROV',
                description: 'Mobile - SIM',
                types: [
                    {
                        code: 'CT03_CNA59_N_SIMPROV',
                        description: 'New SIM Not Active - SIM Purchased from Region',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA326_Delivery',
                description: 'Delivery',
                types: [
                    {
                        code: 'CT02_CNA326_Delivery',
                        description: 'Fleet Incomplete -SR /SR not reached to Fleet',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT03_CNA326_Delivery',
                        description: 'Etisalat Logistic Partner Delivery Issues ',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT04_CNA326_Delivery',
                        description: 'Fleet Delivery Issues ',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA326_Delivery',
                        description: 'Etisalat Logistic Partner Incomplete -SR /SR not reached ',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA330_SUBS',
                description: 'Subscription Issues ',
                types: [
                    {
                        code: 'CT02_CNA330_SUBS',
                        description: 'Un subcription via Online ',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA330_SUBS',
                        description: 'Subscription via Online ',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT07_CNA330_SUBS',
                        description: 'Un subcription via USSD , IVR, Short code ',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT06_CNA330_SUBS',
                        description: 'Subscription via USSD , IVR, Short code ',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT05_CNA330_SUBS',
                        description: 'SR not processed',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA330_SUBS',
                        description: 'Un subcription via CIM/CBCM',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT03_CNA330_SUBS',
                        description: 'Subscription via CIM/CBCM',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA137_FLT_SIM',
                description: 'Customer SIM/ account not activated',
                types: [
                    {
                        code: 'CT01_CNA137_FLT_SIM',
                        description: 'SR not processed',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA139_FLT_DOD_CIM',
                description: 'Fleet Team-delay of delivery',
                types: [
                    {
                        code: 'CT04_CNA139_FLT_DOD_CIM',
                        description: 'Wrong delivery from Fleet',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA139_FLT_DOD_CIM',
                        description: 'Customer unreachable',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA139_FLT_DOD_CIM',
                        description: 'No contact from Fleet',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA139_FLT_DOD_CIM',
                        description: 'Incomplete -SR',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            }
        ]
    },
    {
        code: 'Billing',
        description: 'Billing',
        natures: [
            {
                code: 'CNA09_PP_USAGE',
                description: 'Additional Charges',
                types: [
                    {
                        code: 'CT09_CNA09_PP_USAGE',
                        description: 'Postpaid Local SMS/Premium SMS overcharge',
                        specialFields: null,
                        sla: '{"all":"0 Days ","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA09_PP_USAGE',
                        description: 'Postpaid Long duration IDD/STD call charges',
                        specialFields: null,
                        sla: '{"all":"7 Days "}'
                    }
                ]
            },
            {
                code: 'CNA301_ADJFEE',
                description: 'Adjustment &amp; Fees',
                types: [
                    {
                        code: 'CT03_CNA301_ADJFEE',
                        description: 'Transfer balance from one account to another',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA301_ADJFEE',
                        description: 'Adjustment Not Reflected',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA301_ADJFEE',
                        description: 'Debit Adjustment',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA301_ADJFEE',
                        description: 'Promotional Discounts/Rebate',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA316_USAGE',
                description: 'Usage ',
                types: [
                    {
                        code: 'CT24_CNA316_USAGE',
                        description: 'IBT Failed/Delayed ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT10_CNA316_USAGE',
                        description: 'Minutes/SMS Freebies Not Provided',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA316_USAGE',
                        description: 'UBT Transfer to Inactive Accounts',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT26_CNA316_USAGE',
                        description: 'Charity SMS Dispute',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA316_USAGE',
                        description: 'Carrier Billing Disputes ',
                        specialFields: null,
                        sla: '{"all":"cs101"}'
                    },
                    {
                        code: 'CT14_CNA316_USAGE',
                        description: 'DBT Failed/Delayed ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT25_CNA316_USAGE',
                        description: 'UBT Failed/Delayed ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT17_CNA316_USAGE',
                        description: 'Voice Call Charges Disputes ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT12_CNA316_USAGE',
                        description: 'Data Freebies not provided',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT20_CNA316_USAGE',
                        description: 'Data Charges Disputes ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT18_CNA316_USAGE',
                        description: 'SMS/MMS Charges Disputes ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CT304_INVOICE',
                description: 'Invoice ',
                types: [
                    {
                        code: 'CT03_CT304_INVOICE',
                        description: 'Not Received ',
                        specialFields: null,
                        sla: '{"all":"","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CT304_INVOICE',
                        description: 'Received Wrong Bill/Template',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CT310_MobApp',
                description: 'Payment - Etisalat Mobile APP',
                types: [
                    {
                        code: 'CT02_CT310_MobApp',
                        description: 'Payment Via Etisalat Mobile APP but not credited in CBCM /CIM',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CT310_MobApp',
                        description: 'Payment Via Etisalat Mobile APP Failure in Channels Payment Transaction History from CIM',
                        specialFields: null,
                        sla: '{"all":"","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA16_GEN_PAY_R',
                description: 'Payment Reconnection',
                types: [
                    {
                        code: 'CT09_CNA16_GEN_PAY_R',
                        description: 'Postpaid/Prepaid payment through Ezeepay to a wrong account',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA16_GEN_PAY',
                description: 'Payment Reconnection ',
                types: [
                    {
                        code: 'CT14_CNA16_GEN_PAY',
                        description: 'Balance Transfer from Ceased Account Prepaid',
                        specialFields: null,
                        sla: '{"all":"7 Days "}'
                    },
                    {
                        code: 'CT20_CNA16_GEN_PAY',
                        description: 'Postpaid/Prepaid payment through Smart Service Machine to wrong number',
                        specialFields: null,
                        sla: '{"all":"7 Days "}'
                    }
                ]
            },
            {
                code: 'CNA110_PAYG',
                description: 'Balance Deduction - Data',
                types: [
                    {
                        code: 'CT02_CNA110_PAYG',
                        description: 'Customer charged PAYG without receiving sms notification',
                        specialFields: null,
                        sla: '{"all":"7 Days "}'
                    },
                    {
                        code: 'CT08_CNA110_PAYG',
                        description: 'Customer charged due to using wrong APN',
                        specialFields: null,
                        sla: '{"all":"7 Days "}'
                    },
                    {
                        code: 'CT07_CNA110_PAYG',
                        description: 'Customer charged PAYG after consuming his package with hard cap - prepaid',
                        specialFields: null,
                        sla: '{"all":"7 Days "}'
                    }
                ]
            },
            {
                code: 'CNA312_Eshop',
                description: 'Payment - Etisalat Website (ESHOP)',
                types: [
                    {
                        code: 'CT01_CNA312_Eshop',
                        description: 'Payment Via Etisalat Website (ESHOP) Failure in Channels Payment Transaction History from CIM',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA16_GEN_PAY5_CIM',
                description: 'Payment Ezeepay',
                types: [
                    {
                        code: 'CT09_CNA16_GEN_PAY5_CIM',
                        description: 'payment wrong account',
                        specialFields: null,
                        sla: '{"all":"7 Days "}'
                    }
                ]
            },
            {
                code: 'CNA118_UBT',
                description: 'UBT',
                types: [
                    {
                        code: 'CT04_CNA118_UBT',
                        description: 'Transfer to wrong account',
                        specialFields: null,
                        sla: '{"all":"7 Days "}'
                    }
                ]
            },
            {
                code: 'CNA19_ADL_CHG_CIM',
                description: 'Additional Charges',
                types: [
                    {
                        code: 'CT13_CNA19_ADL_CHG_CIM',
                        description: 'Late payment fee dispute',
                        specialFields: null,
                        sla: '{"all":"24 Hours"}'
                    }
                ]
            },
            {
                code: 'CNA125_PBC',
                description: 'Payment Business Center - Outlet counter ',
                types: [
                    {
                        code: 'CT01_CNA125_PBC_R',
                        description: 'credited to wrong number by customer',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA125_PBC',
                        description: 'credited to wrong number by customer',
                        specialFields: null,
                        sla: '{"all":"7 Days "}'
                    }
                ]
            },
            {
                code: 'CNA315_Rental',
                description: 'Rental ',
                types: [
                    {
                        code: 'CT14_CNA315_Rental',
                        description: 'Rental Not Deducted',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT21_CNA315_Rental',
                        description: 'Multiple Rental ',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT11_CNA315_Rental',
                        description: 'Wrong Rental Charged during Promo ',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT20_CNA315_Rental',
                        description: 'Wrong Exit Charges ',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA315_Rental',
                        description: 'Weyak ',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT15_CNA315_Rental',
                        description: 'Rental Renewed without agreement ',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT09_CNA315_Rental',
                        description: 'Third Party',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT16_CNA315_Rental',
                        description: 'Wrong Rental',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            }
        ]
    },
    {
        code: 'Technical',
        description: 'Technical',
        natures: [
            {
                code: 'CNA330_PCS',
                description: 'Parental Control Service Issues',
                types: [
                    {
                        code: 'CT12_CNA330_PCS',
                        description: 'PC Account ID Missing (API failure)',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT15_CNA330_PCS',
                        description: 'PC App Login Issue',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT14_CNA330_PCS',
                        description: 'PC CRM Mismatch',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT13_CNA330_PCS',
                        description: 'PC Activation key issue (API failure)',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA278_DOD',
                description: 'Device Deal of the day',
                types: [
                    {
                        code: 'CT01_CNA278_DOD',
                        description: 'Unable to subscribe to Device Deal of the day',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA45_ROAM',
                description: 'Roaming',
                types: [
                    {
                        code: 'CT07_CNA45_ROAM',
                        description: 'Roaming Subscription',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT10_CNA45_ROAM',
                        description: 'Blackberry Not working While Roaming',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA45_ROAM',
                        description: 'Roaming Unsubscription',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA73_VOICECALL',
                description: 'Mobile Voice',
                types: [
                    {
                        code: 'CT14_CNA73_VOICECALL',
                        description: 'No Audio/One Way Speech',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT11_CNA73_VOICECALL',
                        description: 'Call Waiting Unsubscription',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA344_Usage',
                description: 'Usage Issues',
                types: [
                    {
                        code: 'CT04_CNA344_Usage',
                        description: 'Unable to block Spam SMS ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA344_Usage',
                        description: 'Unable to use UBT',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT09_CNA344_Usage',
                        description: 'Unable to send/Receive MMS',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA344_Usage',
                        description: 'Unable to use IBT',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT11_CNA344_Usage',
                        description: 'Unable to purchase from Google Play /Apple Store',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA344_Usage',
                        description: 'Unable to send/Receive SMS ',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA344_Usage',
                        description: 'Preferred language Issue',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA344_Usage',
                        description: 'Unable to Use USSD',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA344_Usage',
                        description: 'Unable to select operators while roaming',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA344_Usage',
                        description: 'Unable to use DBT',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT10_CNA344_Usage',
                        description: 'VAS Service Issue',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA332_Call',
                description: 'Calls Issues',
                types: [
                    {
                        code: 'CT03_CNA332_Call',
                        description: 'Video calls Issue',
                        specialFields: null,
                        sla: '{"all":"5 Days","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA332_Call',
                        description: 'No Incoming',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA332_Call',
                        description: 'No Outgoing Calls',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA44_GTUNE',
                description: 'Mobile - VAS',
                types: [
                    {
                        code: 'CT07_CNA44_GTUNE',
                        description: 'Greetune Unsubscription',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA331_AppWeb',
                description: 'Application &amp; Websites Issues',
                types: [
                    {
                        code: 'CT05_CNA331_AppWeb',
                        description: 'Peer to Peer',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT04_CNA331_AppWeb',
                        description: 'Streaming Services',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA331_AppWeb',
                        description: 'Social Media Apps',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA331_AppWeb',
                        description: 'Online Gaming',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA331_AppWeb',
                        description: 'Websites',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA34_35G',
                description: 'Mobile Data',
                types: [
                    {
                        code: 'CT04_CNA34_35G',
                        description: 'Data Subscription',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA34_35G',
                        description: 'Unable to use Data -Package not defined in ESDP / CSS',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA342_SSM',
                description: 'SSM - Smart Machine Faults',
                types: [
                    {
                        code: 'CT01_CNA342_SSM',
                        description: 'Network Problem ',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT03CNA342_SSM',
                        description: 'SIM Card Stuck in the machine',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT02CNA342_SSM',
                        description: 'No Power',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA52_MNP',
                description: 'MNP',
                types: [
                    {
                        code: 'CT03_CNA52_MNP',
                        description: 'MNP No outgoing calls',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT09_CNA52_MNP',
                        description: 'Request for MNP Missing - CCC',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA52_MNP',
                        description: 'No outgoing intrl. Call from Du Acct. (MNP)',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA52_MNP',
                        description: 'MNP NO I/C Calls',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA35_ALMERSAL',
                description: 'Voice Mail',
                types: [
                    {
                        code: 'CT03_CNA35_ALMERSAL',
                        description: 'Al Mersal Settings',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA35_ALMERSAL',
                        description: 'Al Mersal Unsubscription',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA35_ALMERSAL',
                        description: 'Al Mersal Subscription',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA36_BB',
                description: 'Blackberry Data',
                types: [
                    {
                        code: 'CT12_CNA36_BB',
                        description: 'Blackberry Subscription',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT13_CNA36_BB',
                        description: 'Blackberry Unsubscription',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA36_BB',
                        description: 'Blackberry not defined in MDSP',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA194_LTE_TV',
                description: 'FLTE',
                types: [
                    {
                        code: 'CT05_CNA194_LTE_TV',
                        description: 'Service Class related Issues',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA194_LTE_TV',
                        description: 'SIM Registration issue',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA194_LTE_TV',
                        description: 'User Profile Issue',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA194_LTE_TV',
                        description: 'Data Package Subscriptions',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA194_LTE_TV',
                        description: 'Base station',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA192_LTE_Internet',
                description: 'FLTE (INTERNET)',
                types: [
                    {
                        code: 'CT02_CNA192_LTE_Internet',
                        description: 'Slow Browsing',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA192_LTE_Internet',
                        description: 'CPE Faulty',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA192_LTE_Internet',
                        description: 'No Browsing / NO IP',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA192_LTE_Internet',
                        description: 'SIM CARD FAULTY &nbsp;(Registration )',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA192_LTE_Internet',
                        description: 'Frequent Disconnection',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA192_LTE_Internet',
                        description: 'Registration - Authentication',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            }
        ]
    },
    {
        code: 'RetailSales',
        description: 'Retail Sales',
        natures: [
            {
                code: 'CNA16_Ret_CallBack',
                description: 'CC – Callback Request',
                types: [
                    {
                        code: 'CAN01_CNA16_Ret_CallBack',
                        description: 'CC – Callback Request',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA32_Req_EPR_RET',
                description: 'Excess Amount Refund Request',
                types: [
                    {
                        code: 'CT01_CNA32_Req_EPR_RET',
                        description: 'Bank Transferal',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA32_Req_EPR_RET',
                        description: 'Credit Debit card reversal',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA12_RET',
                description: 'WinCash/Payment/Auto payment Related - RS',
                types: [
                    {
                        code: 'CT03_CNA12_RET',
                        description: 'Wincash Issue',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA12_RET',
                        description: 'Autopay Registration Issue',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA12_RET',
                        description: 'Payment Not Reflected',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT01_CNA12_RET',
                        description: 'Autopay Not Reflected',
                        specialFields: null,
                        sla: '{"all":"24 Hours","cs101":"","cs102":"","cs103":"","cs104":"12 Hours","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA15_RET',
                description: 'Number Related - RS',
                types: [
                    {
                        code: 'CT02_CNA15_RET',
                        description: 'Number&nbsp;Release Request Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA15_RET',
                        description: 'Change Network Element',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA14_RET',
                description: 'Party Related - RS',
                types: [
                    {
                        code: 'CT01_CNA14_RET',
                        description: 'Creating New Party ID Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT02_CNA14_RET',
                        description: 'Update Existing Party Details Issue',
                        specialFields: null,
                        sla: null
                    }
                ]
            },
            {
                code: 'CNA13_RET',
                description: 'SubRequest Related -RS',
                types: [
                    {
                        code: 'CT09_CNA13_RET',
                        description: 'Change Category Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT14_CNA13_RET',
                        description: 'Re-Provision&nbsp;Account Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT12_CNA13_RET',
                        description: 'Migration of Plan Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT02_CNA13_RET',
                        description: 'Add / Delete Service Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT11_CNA13_RET',
                        description: 'Subscribership Transfer Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT05_CNA13_RET',
                        description: 'New Sale Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT16_CNA13_RET',
                        description: 'Installation Address Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT07_CNA13_RET',
                        description: 'Re-Registeration Account Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT01_CNA13_RET',
                        description: 'Community ID Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT13_CNA13_RET',
                        description: 'Prepaid Renewal Account Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT03_CNA13_RET',
                        description: 'Upgrade /Downgrade Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT15_CNA13_RET',
                        description: 'Toss Account Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT04_CNA13_RET',
                        description: 'Add Device Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT10_CNA13_RET',
                        description: 'Change Number Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT08_CNA13_RET',
                        description: 'Account Cessation Issue',
                        specialFields: null,
                        sla: null
                    },
                    {
                        code: 'CT06_CNA13_RET',
                        description: 'SIM Replacement Error',
                        specialFields: null,
                        sla: null
                    }
                ]
            }
        ]
    },
    {
        code: 'Waivers-Request',
        description: 'Waivers Request',
        natures: [
            {
                code: 'CNA001_DOP',
                description: 'DOP Waivers Requests - Customer dispute ',
                types: [
                    {
                        code: 'CT09_CNA001_DOP',
                        description: 'Waivers request up to 3000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA001_DOP',
                        description: 'Waivers request &nbsp;up to 1000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA001_DOP',
                        description: 'Waivers request &nbsp;up to 750 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA001_DOP',
                        description: 'Waivers request up to 200 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT11_CNA001_DOP',
                        description: 'Waivers request &nbsp;up to 10000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA001_DOP',
                        description: 'Waivers request up to 500 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT10_CNA001_DOP',
                        description: 'Waivers request up to 5000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA001_DOP',
                        description: 'Waivers request up to 1500 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA003_DOP',
                description: 'DOP Waivers Requests - Staff Mistake ',
                types: [
                    {
                        code: 'CT09_CNA003_DOP',
                        description: 'Waivers request up to 10000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT08_CNA003_DOP',
                        description: 'Waivers request &nbsp;up to 3000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA003_DOP',
                        description: 'Waivers request &nbsp;up to 2000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA003_DOP',
                        description: 'Waivers request up to 300 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA003_DOP',
                        description: 'Waivers request up to 1000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT02_CNA003_DOP',
                        description: 'Waivers request &nbsp;up to 200 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA003_DOP',
                        description: 'Waivers request &nbsp;up to 500 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT04_CNA003_DOP',
                        description: 'Waivers request &nbsp;up to 400 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            },
            {
                code: 'CNA002_DOP',
                description: 'DOP Waivers Requests -System error ',
                types: [
                    {
                        code: 'CT04_CNA002_DOP',
                        description: 'Waivers request &nbsp;up to 400 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT06_CNA002_DOP',
                        description: 'Waivers request up to 1000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT03_CNA002_DOP',
                        description: 'Waivers request up to 300 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT07_CNA002_DOP',
                        description: 'Waivers request up to 2000 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    },
                    {
                        code: 'CT05_CNA002_DOP',
                        description: 'Waivers request &nbsp;up to 500 AED',
                        specialFields: null,
                        sla: '{"all":"7 Days","cs101":"","cs102":"","cs103":"","cs104":"3 Days","cs105":"","cs106":""}'
                    }
                ]
            }
        ]
    }
];
