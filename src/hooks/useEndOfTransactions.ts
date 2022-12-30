import { useState } from "react";

export function useEndOfTransactions() {
    const [endOfTransactions, setStateEndOfTransactions] = useState(false);
    
    return { endOfTransactions, setStateEndOfTransactions };
}