{{P(file)}}

import java.util.List;

import org.lsmy.cloud.common.exception.CloudBaseRuntimeException;
import org.lsmy.cloud.common.vo.PageResult;
{{P(file).replace("package","import").replace("service","vo."+U(data.table)+"VO")}}
{{P(file).replace("package","import").replace("service","vo.svo."+U(data.table)+"SearchVO")}}

public interface {{U(data.table)}}Service
{
    /**
     * @description 根据条件做搜索
     * @param svo
     * @return
     * @lastModifier
     */
    PageResult list({{U(data.table)}}SearchVO svo) throws CloudBaseRuntimeException;


    /**
     * @description 根据主键获取
     * @param svo
     * @return
     * @lastModifier
     */
    {{U(data.table)}}VO get({{data.priField.JavaType.type}} {{data.priField.Field}}) throws CloudBaseRuntimeException;

    /**
     * @description 插入
     * @param vo
     * @return
     * @lastModifier
     */
    void insert({{U(data.table)}}VO vo) throws CloudBaseRuntimeException;

    /**
     * @description 批量插入
     * @param list
     * @return
     * @lastModifier
     */
    void insertList(List<{{U(data.table)}}VO> list) throws CloudBaseRuntimeException;

    /**
     * @description 更新
     * @param vo
     * @return
     * @lastModifier
     */
    void update({{U(data.table)}}VO vo) throws CloudBaseRuntimeException;

    /**
     * @description 批量更新
     * @param list
     * @return
     * @lastModifier
     */
    void updateList(List<{{U(data.table)}}VO> list) throws CloudBaseRuntimeException;

    /**
     * @description 删除
     * @param {{data.priField.Field}}
     * @return
     * @lastModifier
     */
    void delete({{data.priField.JavaType.type}} {{data.priField.Field}}) throws CloudBaseRuntimeException;

    /**
     * @description 批量删除
     * @param list
     * @return
     * @lastModifier
     */
    void deleteList(List<{{data.priField.JavaType.type}}> list) throws CloudBaseRuntimeException;
}
