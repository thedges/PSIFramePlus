public without sharing class PSIFramePlus {
    @AuraEnabled
    public static Map<String,Object> getData(String recordId, List<String> params)
    {
        Map<String,Object> resp = new Map<String,Object>();

        String sobjectType = Id.valueOf(recordId).getSObjectType().getDescribe().getName();
        String paramStr = convStringListToCSV(params);

        String soqlStr = 'SELECT ' + paramStr + '\n' +
                         '  FROM ' + sobjectType + ' WHERE Id = \'' + recordId + '\'';

        List<SObject> sobjList = Database.query(soqlStr);
        if (sobjList != null && sobjList.size() == 1)
        {
            Map<String, Object> tmpMap = new Map<String, Object>();
            for (String p : params)
            {
                resp.put(p, getValue(sobjList[0], p));
            }
        }

        return resp;
    }

    private static Object getValue(SObject obj, String param)
    {
        Object resp = null;

        // traverse object
        if (param.indexOf('.') != -1)
        {
            List<String> pList = param.split('.');
            Integer i = 1;
            for (String pName : pList)
            {
                if (i++ != pList.size())
                {
                    obj = (SObject)obj.getSObject(pName);
                }
                else {
                    resp = obj.get(pName);
                }
            }
        }
        else {
            resp = obj.get(param);
        }

        return resp;

    }

    private static String convStringListToCSV(List<String> params)
    {
        if (params == null || params.size() == 0 )
        {
            return null;
        }

        String tmpStr = '';
        for (String p : params)
        {
            if (tmpStr.length() == 0)
            {
                tmpStr = p;
            }
            else {
                tmpStr += ', ' + p;
            }
        }
        return tmpStr;
    }
}