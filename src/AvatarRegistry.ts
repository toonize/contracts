import Chain from "@lev-x/loom-x/dist/chains/Chain";
import { ethers } from "ethers";

export default class AvatarRegistry extends ethers.Contract {
    public static at(chain: Chain) {
        return new AvatarRegistry(
            require("../networks/AvatarRegistry.json")[chain.config.chainId].address,
            chain.signer
        );
    }

    constructor(address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
        super(address, require("../abis/AvatarRegistry.json"), signerOrProvider);
    }
}
