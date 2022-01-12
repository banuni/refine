export interface OpenNotificationParams {
    key: string;
    message: string;
    type: "success" | "error" | "progress";
    description?: string;
    cancelMutation?: () => void;
    undoableTimeout?: number;
}

export interface INotificationProviderContext {
    open: (params: OpenNotificationParams) => void;
    close: (key: string) => void;
}