<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="org.lsmy.cloud.{{ext.project}}.mapper.custom.{{U(data.table)}}CustomDao">
	<insert id="insertList">
		INSERT INTO {{data.table}} ({{each data.fields as field,index}}{{field.Field}}{{if index!= data.fields.length-1}},{{/if}}{{/each}})
    VALUES
    <foreach collection="list" item="item" index="index" separator=",">
      ({{each data.fields as field,index}}#{item.{{field.Field}},jdbcType={{field.SqlType}}}{{if index!= data.fields.length-1}},{{/if}}{{/each}})
    </foreach>
	</insert>

  <update id="updateList" >
	<foreach collection="list" item="item" index="index" separator=";">
    UPDATE {{data.table}}
    <set >
      {{each data.fields as field,index}}{{if field.Key != "PRI"}}
      <if test="item.{{field.Field}} != null" >
        {{field.Field}} = #{item.{{field.Field}},jdbcType={{field.SqlType}}},
      </if>{{/if}}{{/each}}
    </set>
    WHERE {{data.priField.Field}} = #{item.{{data.priField.Field}}}
	</foreach>

  </update>
</mapper>
