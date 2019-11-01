import { Address } from "@lev-x/loom-x/dist";
import Chain from "@lev-x/loom-x/dist/chains/Chain";
import { ethers } from "ethers";
import { BigNumber } from "ethers/utils";

export default class AvatarRegistry extends ethers.Contract {
    public static at(chain: Chain) {
        return new AvatarRegistry(
            require("../networks/AvatarRegistry.json")[chain.network.chainId].address,
            chain.signer
        );
    }

    constructor(address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
        super(address, require("../abis/AvatarRegistry.json"), signerOrProvider);
    }

    public getNumberOfAvatarsOf(account: Address, overrides = {}): Promise<BigNumber> {
        return this.functions.getNumberOfAvatarsOf(account.toLocalAddressString(), overrides);
    }

    public getAvatarsOf(account: Address, overrides = {}): Promise<string[]> {
        return this.functions.getAvatarsOf(account.toLocalAddressString(), overrides);
    }

    public getSelectedAvatarOf(account: Address, overrides = {}): Promise<string> {
        return this.functions.getSelectedAvatarOf(account.toLocalAddressString(), overrides);
    }

    public accountOfAvatar(hash: string, overrides = {}): Promise<string> {
        return this.functions.accountOfAvatar(hash, overrides);
    }

    public addAvatar(hash: string, overrides = {}): Promise<ethers.providers.TransactionResponse> {
        return this.functions.addAvatar(hash, overrides);
    }

    public selectAvatar(hash: string, overrides = {}): Promise<ethers.providers.TransactionResponse> {
        return this.functions.selectAvatar(hash, overrides);
    }

    public setAttribute(
        hash: string,
        key: string,
        value: string,
        overrides = {}
    ): Promise<ethers.providers.TransactionResponse> {
        return this.functions.setAttribute(hash, key, value, overrides);
    }

    public getAttribute(hash: string, key: string, overrides = {}): Promise<string> {
        return this.functions.getAttribute(hash, key, overrides);
    }
}
