import { PeriodType } from "../../interfaces/periodType";

export interface INotificationService {
    setNotifications: (period: PeriodType) => {};
    processedNotifications: () => {};

}

// @todo
export class NotificationService {

    setNotificationCrone() {

        return () => {

        }
    }

    // setNotifications
    // check if expire date in 7 days

    // processNotifications
    processNotifications() {
        
    }
}