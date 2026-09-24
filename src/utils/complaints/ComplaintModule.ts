import { ComplaintCaptureMode } from './enums/ComplaintCaptureMode_Enum';
namespace ComplaintModule {
    let captureMode: ComplaintCaptureMode = ComplaintCaptureMode.CREATE_BY_ACCOUNT; // default for creation
    let bulkComplaintContactSet: any = null;
    let bulkComplaintFlag = false;
    let bitStreamFlagForCurrentAccount = false;
    let dummyParty = false;
    let repeatedWaiverRequestInCurrentMonth: any = null;
    let validateBulkEnabled = false;
    let previousTechnicalComplaints: string[] = [];
    let renderExtNo = false;
    let isFemtoLoaded = false;
    let ignoreWaiverRepeated = false;

    // This function checks if the reporting channel is disabled based on the current capture mode and conditions.
    // export function isReportingChannelDisabled() : boolean {
    //     return (captureMode === ComplaintCaptureMode.UPDATE) ||
    //             (captureMode === ComplaintCaptureMode.UPDATE && isBussinessCustomerSegment());
    // }
}
