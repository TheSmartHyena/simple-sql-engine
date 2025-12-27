// It's important to put the length 2 operator first => when we .includes we dont want false positives
export const operators = [">=", "<=", ">", "<", "=" ] as const;