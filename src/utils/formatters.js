export function formatAttributeValue(attr) {
    const { value, type } = attr;

    if (value === null || value === undefined) return "";
    if (value.display_value) return value.display_value;

    switch (type) {
        case "number":
            if (value.qty !== undefined) {
                let str = `${value.qty}${value.unit ? " " + value.unit : ""}`;
                if (value.approx) {
                    str = str + " (approx.)"
                }
                return str
            }
            return String(value);

        case "integer":
            return `${value}${value.unit ? " " + value.unit : ""}`;

        case "range":
            if (value.min && value.max) {
                return `${value.min}-${value.max}${value.unit ? " " + value.unit : ""}`;
            }
            return JSON.stringify(value);

        case "enum":
            return Array.isArray(value) ? value.join(", ") : String(value);

        default:
            if (value.l && value.h && value.p) {
                return `${value.l} × ${value.h} × ${value.p}${value.unit ? " " + value.unit + " (L x H x D)" : ""}`;
            }
            if (value.length && value.height && value.depth) {
                return `${value.length} x ${value.height} x ${value.depth}${value.unit ? " " + value.unit + " (L x H x D)" : ""}`;
            }
            if (value.net && value.gross && value.unit) { // Net/Gross weight
                return `Net: ${value.net} ${value.unit} - Brut: ${value.gross} ${value.unit}`;
            }
            if (value.diameter && value.depth && value.unit) {
                return `Ø ${value.diameter} x ${value.depth} ${value.unit} (P)`;
            }
            if (value.length && value.width && value.unit) {
                return `${value.length} x ${value.width} mm (L x l)`
            }
            return typeof value === "object" ? JSON.stringify(value) : String(value);

        case "boolean":
            return value ? "Oui" : "Non";
    }
}
