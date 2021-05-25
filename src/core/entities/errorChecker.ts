function findError(error: { [key: string]: any }): boolean {
  return !!Object.values(error).find((flag) =>
    typeof flag === "object" ? findError(flag) : flag
  );
}

export { findError };
