{{P(file)}}

import java.util.List;

import org.lsmy.cloud.common.util.BeanUtil;
{{P(file).replace("package","import").replace("helper","vo."+U(data.table)+"VO")}}
{{P(file).replace("package","import").replace("helper","po."+U(data.table))}}
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class {{U(data.table)}}Helper{

    private static Logger logger = LoggerFactory.getLogger({{U(data.table)}}Helper.class);

    /**
    * @Description 转换成VO
    * @param source
    * @return
    * @lastModifier
    */
    public static {{U(data.table)}}VO convertToVO({{U(data.table)}} source){
        return BeanUtil.copy(source,{{U(data.table)}}VO.class);
    }

    /**
    * @Description 转换成ListVO
    * @param source
    * @return
    * @lastModifier
    */
    public static List<{{U(data.table)}}VO> convertToVO(List<{{U(data.table)}}> source){
        return BeanUtil.copy(source,{{U(data.table)}}VO.class);
    }

    /**
    * @Description 转换成PO
    * @param source
    * @return
    * @lastModifier
    */
    public static {{U(data.table)}} convertToPO({{U(data.table)}}VO source){
        return BeanUtil.copy(source,{{U(data.table)}}.class);
    }

    /**
    * @Description 转换成ListPO
    * @param source
    * @return
    * @lastModifier
    */
    public static List<{{U(data.table)}}> convertToPO(List<{{U(data.table)}}VO> source){
        return BeanUtil.copy(source,{{U(data.table)}}.class);
    }

}
