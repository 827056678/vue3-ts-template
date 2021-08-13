import { ElMessage } from "element-plus";

export const Message = {
  success: (text: string): void => {
    ElMessage.success({
      message: text,
      type: "success",
    });
  },
  error: (text: string): void => {
    ElMessage.error({
      message: text,
      type: "error",
    });
  },
  warning: (text: string): void => {
    ElMessage.warning({
      message: text,
      type: "warning",
    });
  },
  default: (text: string): void => {
    ElMessage(text);
  },
};
