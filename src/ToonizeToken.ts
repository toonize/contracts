import { Address } from "@lev-x/loom-x/dist";
import Chain from "@lev-x/loom-x/dist/chains/Chain";
import { ethers } from "ethers";
import { BigNumber } from "ethers/utils";

export default class ToonizeToken extends ethers.Contract {
    public static at(chain: Chain) {
        return new ToonizeToken(require("../networks/ToonizeToken.json")[chain.network.chainId].address, chain.signer);
    }

    constructor(address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
        super(address, require("../abis/ToonizeToken.json"), signerOrProvider);
    }

    public getAvatarsOf(account: Address, overrides = {}): Promise<string[]> {
        return this.functions.getAvatarsOf(account.toLocalAddressString(), overrides);
    }

    public getSelectedAvatarOf(tokenId: BigNumber, overrides = {}): Promise<string> {
        return this.functions.getSelectedAvatarOf(tokenId, overrides);
    }

    public addAvatar(avatar: string, overrides = {}): Promise<ethers.providers.TransactionResponse> {
        return this.functions.addAvatar(avatar, overrides);
    }

    public selectAvatar(avatar: string, overrides = {}): Promise<ethers.providers.TransactionResponse> {
        return this.functions.selectAvatar(avatar, overrides);
    }
}
