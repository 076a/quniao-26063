package com.quniao.util;

import org.bouncycastle.util.encoders.Base64;

public class Base64Util {
    public static String encode(String str) {
        return new String(Base64.encode(str.getBytes()));
    }
}
