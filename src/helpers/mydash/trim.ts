function trim(str: string, strForbChr?: string): string {
    let reg;
    if (strForbChr) {
        reg = new RegExp(`^[${strForbChr}]+|[${strForbChr}]+$`, "g");
        return str.replace(reg, "");
    }
    return str.trim();


}

export default trim;