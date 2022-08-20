// import fg from "fast-glob";
// const modules = await fg(["./**/*.(js|ts)"]);
const modules = import.meta.glob("./**/*.(js|ts)", { eager: true });
Object.keys(modules).forEach((it) => {
  modules[it];
});
