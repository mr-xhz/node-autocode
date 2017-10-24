{{P(file)}}

import java.util.List;

import com.idohoo.o2o.common.exception.CommonRuntimeException;
import com.idohoo.o2o.common.vo.PageResult;
{{P(file).replace("package","import").replace(".biz.",".common.").replace("service","vo.dto."+U(data.table)+"VO")}}
{{P(file).replace("package","import").replace(".biz.",".common.").replace("service","vo.svo."+U(data.table)+"SearchVO")}}

public interface {{U(data.table)}}Service
{
    /**
     * @description 根据条件做搜索
     * @param svo
     * @return
     * @lastModifier
     */
    PageResult list({{U(data.table)}}SearchVO svo) throws CommonRuntimeException;


    /**
     * @description 根据主键获取
     * @param svo
     * @return
     * @lastModifier
     */
    {{U(data.table)}}VO get({{data.priField.JavaType.type}} {{data.priField.Field}}) throws CommonRuntimeException;

    /**
     * @description 插入
     * @param vo
     * @return
     * @lastModifier
     */
    {{U(data.table)}}VO insert({{U(data.table)}}VO vo) throws CommonRuntimeException;

    /**
     * @description 批量插入
     * @param list
     * @return
     * @lastModifier
     */
    List<{{U(data.table)}}VO> insertList(List<{{U(data.table)}}VO> list) throws CommonRuntimeException;

    /**
     * @description 更新
     * @param vo
     * @return
     * @lastModifier
     */
    void update({{U(data.table)}}VO vo) throws CommonRuntimeException;

    /**
     * @description 批量更新
     * @param list
     * @return
     * @lastModifier
     */
    void updateList(List<{{U(data.table)}}VO> list) throws CommonRuntimeException;

    /**
     * @description 删除
     * @param {{data.priField.Field}}
     * @return
     * @lastModifier
     */
    void delete({{data.priField.JavaType.type}} {{data.priField.Field}}) throws CommonRuntimeException;

    /**
     * @description 批量删除
     * @param list
     * @return
     * @lastModifier
     */
    void deleteList(List<{{data.priField.JavaType.type}}> list) throws CommonRuntimeException;
}
