import {Account} from "../../repo/Account.ts";
import {AccountCard} from "./AccountCard.tsx";

export function AccountList({accounts, onClose}: { accounts: Account[], onClose?: () => void }) {

    if (accounts.length === 0) {
        return (
            <>
                No Accounts Found (how are you able to see this???)
            </>
        );
    }

    return (
        <>
            {accounts.map(account => (
                <AccountCard key={account.id} account={account} conClose={onClose} />
            ))}
        </>
    );
}
