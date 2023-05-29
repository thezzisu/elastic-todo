export type PropsType<T> = T extends abstract new (...args: any) => any
  ? InstanceType<T>['$props']
  : T extends { $props: infer P }
  ? P
  : unknown
