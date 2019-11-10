import { Address } from "@lev-x/loom-x/dist";
import Chain from "@lev-x/loom-x/dist/chains/Chain";
import { Signer } from "ethers";
import { Provider, TransactionResponse } from "ethers/providers";

import ERC721Full from "./ERC721Full";

export default class ToonizeToken extends ERC721Full {
    public static at(chain: Chain) {
        return new ToonizeToken(require("../networks/ToonizeToken.json")[chain.network.chainId].address, chain.signer);
    }

    constructor(address: string, signerOrProvider: Signer | Provider) {
        super(address, require("../abis/ToonizeToken.json"), signerOrProvider);
    }

    public getAvatarsOf(account: Address, overrides = {}): Promise<string[]> {
        return this.functions.getAvatarsOf(account.toLocalAddressString(), overrides);
    }

    public getSelectedAvatarOf(account: Address, overrides = {}): Promise<string> {
        return this.functions.getSelectedAvatarOf(account.toLocalAddressString(), overrides);
    }

    public addAvatar(avatar: string, overrides = {}): Promise<TransactionResponse> {
        return this.functions.addAvatar(avatar, overrides);
    }

    public selectAvatar(avatar: string, overrides = {}): Promise<TransactionResponse> {
        return this.functions.selectAvatar(avatar, overrides);
    }
}
