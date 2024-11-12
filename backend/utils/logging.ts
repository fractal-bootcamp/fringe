const separator = "-------------------------------";

export const logging = <TReturn, TArgs extends any[]>(
  operationName: string,
  logRes: boolean,
  fn: (...args: TArgs) => Promise<TReturn>
) => {
  return async (...args: TArgs): Promise<TReturn> => {
    const requestId = String(Math.floor(Math.random() * 100)).padStart(2, "0");

    // Started operation
    const started = [
      separator,
      `FN | ${new Date().toISOString()} | ${operationName} | ${requestId} | STARTED ===>`,
      separator,
    ];

    started.map((log) => {
      console.log(log);
    });

    try {
      const result = await fn(...args);
      const success = [
        separator,
        `FN | ${new Date().toISOString()} | ${operationName} | ${requestId} | SUCCESS ===>`,
        JSON.stringify(result, null, 2),
        separator,
      ];

      if (logRes) {
        success.map((log) => {
          console.log(log);
        });
      } else {
        success.map((log, index) => {
          if (index !== 2) {
            console.log(log);
          }
        });
      }
      return result;
    } catch (error) {
      const failure = [
        separator,
        `FN | ${new Date().toISOString()} | ${operationName} | ${requestId} | ERROR ===>${error}`,
        separator,
      ];
      failure.map((log) => {
        console.log(log);
      });
      throw error;
    }
  };
};
