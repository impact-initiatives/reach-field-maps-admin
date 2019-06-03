declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.min.js' {
  const content: any;
  export default content;
}

declare module NodeJS {
  interface Global {
    fetch: any;
  }
}
